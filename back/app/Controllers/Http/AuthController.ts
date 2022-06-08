import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InvalidCredentialException from 'App/Exceptions/Auth/InvalidCredentialException'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import Route from '@ioc:Adonis/Core/Route'
import { DateTime } from 'luxon'
import InvalidSignedUrlException from 'App/Exceptions/Auth/InvalidSignedUrlException'
import EmailValidator from 'App/Validators/Auth/EmailValidator'
import ResetPasswordDemand from 'App/Mailers/ResetPasswordDemand'
import ResetPasswordValidator from 'App/Validators/Auth/ResetPasswordValidator'
import IdenticalPasswordException from 'App/Exceptions/Auth/IdenticalPasswordException'
import ConfirmAccount from 'App/Mailers/ConfirmAccount'
import ConfirmResetPassword from 'App/Mailers/ConfirmResetPassword'
import InvalidAccountException from 'App/Exceptions/Auth/InvalidAccountException'

export default class AuthController {
    public async login({ auth, request }: HttpContextContract) {
        const payload = await request.validate(LoginValidator)

        const user = await User.findBy('email', payload.email)
        if (!user) throw new InvalidCredentialException('Invalid credentials.')
        if (!user?.verifiedAt) throw new InvalidAccountException('Invalid account.')

        await auth.use('web').attempt(payload.email, payload.password, payload.remember)

        if (Hash.needsReHash(user.password)) {
            user.password = await Hash.make(payload.password)
        }
        return user;
    }

    public async me({ auth }: HttpContextContract) {
        await auth.use('web').authenticate()
        return auth.use('web').user
    }

    public async register({ logger, request, response }: HttpContextContract) {
        const payload = await request.validate(RegisterValidator)
        const signedUrl = Route.makeSignedUrl('verifyEmail', {
            email: payload.email,
        })
        try {
            const mailer = new VerifyEmail(payload.email, signedUrl)
            await mailer.send()
        } catch (error) {
            logger.warn(error)
            return response.badRequest()
        }

        await User.create(payload);
        return response.created()
    }

    public async verify({ request, response }: HttpContextContract) {
        if (!request.hasValidSignature()) {
            throw new InvalidSignedUrlException('Signature is missing or URL was tampered.')
        }

        const user = await User.findBy('email', request.param('email'))
        if (!user) throw new InvalidCredentialException('Invalid credentials.')

        if (user.verifiedAt === null) {
            await user.merge({ verifiedAt: DateTime.now() }).save()
            const mailer = new ConfirmAccount(user)
            await mailer.send()
        }

        response.noContent()
    }

    public async resetPasswordDemand({ logger, request, response }: HttpContextContract) {
        const payload = await request.validate(EmailValidator)
        const signedUrl = Route.makeSignedUrl('resetPassword', {
            email: payload.email,
            expiresIn: '30mins'
        })

        try {
            await User.findByOrFail('email', payload.email)
            const mailer = new ResetPasswordDemand(payload.email, signedUrl)
            await mailer.send()
        } catch (error) {
            logger.warn(error)
            return response.badRequest()
        }

        return response.noContent()
    }

    public async resetPassword({ request, response, logger }: HttpContextContract) {
        if (!request.hasValidSignature()) {
            throw new InvalidSignedUrlException('Signature is missing or URL was tampered.')
        }
        const payload = await request.validate(ResetPasswordValidator)

        const user = await User.findBy('email', request.param('email'))
        if (!user) {
            throw new InvalidCredentialException('Invalid credentials.')
        }

        if (await Hash.verify(user.password, payload.password)) {
            throw new IdenticalPasswordException('Identical of previous passwords.')
        }

        await user!.merge({ password: payload.password }).save()

        try {
            const mailer = new ConfirmResetPassword(user)
            await mailer.send()
        } catch (err) {
            logger.warn(err)
            return response.badRequest()
        }


        response.noContent()
    }

    public async logout({ auth }: HttpContextContract) {
        await auth.use('web').logout()
    }
}
