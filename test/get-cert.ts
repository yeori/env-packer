import crypto from "crypto";

import https from "https";
import { TLSSocket } from "tls";

var options = {
  host: "ssda.app",
  port: 443,
  method: "GET",
};

const req = https.request(options, function () {
  // const cert = res.connection.getPeerCertificate();
  const cert = (req.socket as TLSSocket).getPeerCertificate();
  console.log(cert);
  cert.pubkey;
  // console.log(cert.public)
  const x509 = new crypto.X509Certificate(cert.raw);
  crypto.createECDH;

  console.log(x509.toString());
  console.log("[PUB KEY]");
  // console.log(x509.publicKey);
  // const { publicKey } = x509;

  // console.log(publicKey.asymmetricKeyDetails?.hashAlgorithm);
  // console.log(publicKey.asymmetricKeyDetails?.divisorLength);
  // console.log(publicKey.asymmetricKeyDetails?.namedCurve);
  // publicKey.export();
  const pubKey = x509.publicKey.export({ type: "spki", format: "pem" });
  console.log(pubKey);
});

req.end();
