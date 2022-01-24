const nodemailer = require('nodemailer');
const config = require("./config");
const initModel = require('./model');

const tableStyle = "width: 100%; border: 1px solid;";
const theadStyle = "border: 1px solid;";
const tdStyle = "border: 1px solid;";

const currencyFormatter = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  });

const percentageFormatter = new Intl.NumberFormat('pl-PL', {
    style: 'percent',
    maximumFractionDigits:2
  });

function generateHtml(data) {
    let header = `<thead style='${theadStyle}'><th style='${theadStyle}'>Company Name</th><th style='${theadStyle}'>Price</th><th style='${theadStyle}'>Graham Number</th><th style='${theadStyle}'>% Graham Number Diff</th></thead>`;
    let body = `<tbody>`;

    data.forEach((item) => {
        body += `<tr>`
        body += `<td style='${tdStyle}'>${item.CompanyName}</td>`;
        body += `<td style='${tdStyle}'>${currencyFormatter.format(item.Price)}</td>`;

        body += `<td style='${tdStyle}'>${currencyFormatter.format(item.GrahamNumber)}</td>`;
        body += `<td style='${tdStyle}'>${percentageFormatter.format((item.GrahamNumber / item.Price) - 1)}</td>`;
        
        body += `</tr>`;
    });

    body += `</tbody>`;

    return `<h2>Financial Report</h2><table style='${tableStyle}'>${header}${body}</table>`;
}

var mailer = {
    sendEmail: (data) => {
        let mailTransporter = nodemailer.createTransport({
            service: config.email.service,
            auth: {
                user: config.email.address,
                pass: config.email.password
            }
        });
          
        let mailDetails = {
            from: config.email.address,
            to: config.email.address,
            subject: `Weekly stock digest ${new Date().toLocaleDateString('en-US', config.email.dateOptions)}`,
            html: generateHtml(data)
        };
          
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs', err);
            } else {
                console.log('Email sent successfully');
            }
        });
    }
};

module.exports = mailer;