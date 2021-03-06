const nodemailer = require('nodemailer');
const config = require("./config");
const initModel = require('./model');
const methods = require('./methods');

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
    let header = `<thead style='${theadStyle}'>`;
    header += `<th style='${theadStyle}'>Company Name</th>`;
    header += `<th style='${theadStyle}'>Price</th>`;

    methods.forEach((method) => {
        header += `<th style='${theadStyle}'>${method.name}</th>`;
    });
    header += `</thead>`;

    let body = `<tbody>`;

    data.forEach((item) => {
        body += `<tr>`
        body += `<td style='${tdStyle}'>${item.CompanyName}</td>`;
        body += `<td style='${tdStyle}'>${currencyFormatter.format(item.Price)}</td>`;

        item.MethodValues.forEach((method) => {
            let value = method.useNumberFormatter ? currencyFormatter.format(method.value) : `<span title='${JSON.stringify(method.value)}'>${method.value.Result}</span>`;
            
            if(method.calcDifference) {
                let percentage = method.percentage;
                let fontColor = percentage > 0 ? "color: green" : "color: red";
                body += `<td style='${tdStyle}'>${value} <span style='${fontColor}'>(${percentageFormatter.format(percentage)})</span></td>`;
            }
            else {
                body += `<td style='${tdStyle}'>${value}</td>`;
            }
        });
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