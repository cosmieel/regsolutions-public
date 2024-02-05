let isCloudpaymentScriptReady = false;

const loadCloudpaymentsScript = function () {
  return new Promise(function (resolve) {
    if (isCloudpaymentScriptReady) {
      resolve();
    }

    const cloudpaymentsScript = document.createElement('script');
    cloudpaymentsScript.type = 'text/javascript';
    cloudpaymentsScript.async = false;
    window.document.head.append(cloudpaymentsScript);
    cloudpaymentsScript.src = 'https://widget.cloudpayments.ru/bundles/cloudpayments.js';

    cloudpaymentsScript.addEventListener('load', function () {
      isCloudpaymentScriptReady = true;
      resolve();
    });
  });
};

const pay = async function ({ receipt, recurrent, params }) {
  await loadCloudpaymentsScript();

  return new Promise(function (resolve, reject) {
    const widget = new window.cp.CloudPayments();

    const data = {};
    data.CloudPayments = {
      CustomerReceipt: receipt,
      recurrent,
    };

    const { publicId, description, amount, currency, invoiceId, accountId } = params;

    widget.charge(
      {
        publicId,
        description,
        amount,
        currency,
        invoiceId,
        accountId,
        data: data,
      },
      function (options) {
        resolve(options);
      },
      function (reason, options) {
        reject({ reason, options });
      }
    );
  });
};

export { pay };
