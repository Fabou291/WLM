import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const SendNewPassword = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [urlTokenSignature, setUrlTokenSignature] = useState();

  const getSignatureFromUrl = (url) => url.split("signature=")[1];

  useEffect(() => {
    const getUrlToken = searchParams.get("token");
    if (!getUrlToken) {
      navigate("/login");
    }

    const decodedUrlToken = atob(getUrlToken);
    setUrlTokenSignature(getSignatureFromUrl(decodedUrlToken));
  }, []);

  return (
    <div>decoded: {urlTokenSignature}</div>
  );
};

export default SendNewPassword;