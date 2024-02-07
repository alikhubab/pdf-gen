const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const pdf = require('html-pdf');
const jsonData = require('./data.json');
const cors = require('cors')
const nodemailer = require("nodemailer");
let base64Images = {
    img1: '',
    img2: '',
    img3: ''
};
let data1 = {

};

let data2 = {
};

let data3 = {
};


let htmlContent = ''
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/form1.html');
});

app.post('/submitForm1', async (req, res) => {
    data1 = await req.body;
    base64Images.img1 = data1.gstinUpload_base64
    base64Images.img2 = data1.aadharUpload_base64
    base64Images.img3 = data1.panUpload_base64
    res.redirect('/form2');
});

app.get('/form2', (req, res) => {
    
    res.sendFile(__dirname + '/view/form2.html');
});
app.get('/signature.png', (req, res) => {
    
    res.sendFile(__dirname + '/signature.png');
});

app.post('/submitForm2', async (req, res) => {
    data2 = await req.body;
    console.log(data2)
    res.redirect('/form3');
});

app.get('/form3', (req, res) => {

    res.sendFile(__dirname + '/view/form3.html');
});
const transport = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'shoaibkhankhan0345@gmail.com',
        pass : 'jvhr illd vlcv bzna'
    }
})
  
  // async..await is not allowed in global scope, must use a wrapper

app.get('/save', async (req, res) => {
    htmlContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Form Reader</title>
        <style>
        *{
            margin: 0px;
            padding: 0px;
            font-family: sans-serif;
            box-sizing : border-box;
        }
        .main-div{
            width: calc(100% - 80px);
            margin-left: 40px;
            border: 1px solid black;
            background-color: #e4e2e2;
            font-family: sans-serif;
            font-style: italic;
        }
        .row-data{
            width: 100%;
            border-bottom: 1px solid black;
            display: -webkit-box; /* wkhtmltopdf uses this one */
            display: flex;
        }
        .left{
            display: -webkit-box; /* wkhtmltopdf uses this one */
            display: flex;
            align-items: flex-start;
            width: 35%;
        }
        .right{
            width: 58%;
        }
        .left, .right{
            padding: 10px;
            font-size: 20px;
            padding-bottom: 20px;
            line-height : normal;
        }
        .left{
            border-right: 1px solid black;
        }
        .ind{
            width: 7%;
            border-right: 1px solid black;
            font-size: 20px;
            text-align: end;
            padding: 10px;
            padding-bottom: 20px;
        }
        .top-heading{
            margin-top: 60px;
            margin-left: 40px;
    
            width: calc(100% - 80px);
            font-size: 52px;
            text-align: center;
            font-weight: 900;
            background-color: #e4e2e2;
            border-top: 1px solid black;
            border-bottom: 1px solid black;
            font-style: italic;
        }
        .l1{
            font-size: 20px;
            width: 23%;
            border-right: 1px solid black;
            padding: 10px
        }
        p{
            margin: 0px;
            padding: 0px;
        }
        .l2{
            font-size: 20px;
            width: 70%;
        }
        .sub-li{
            font-size: 20px;
            display: -webkit-box; /* wkhtmltopdf uses this one */
            display: flex;
            border-bottom: 1px solid black;
           
        }
        .r1,r1{
            font-size: 20px;
            width: 50%;
            padding: 10px;
            padding-bottom : 20px
        }
        .r1{
            border-right: 1px solid black;
        }
        .third-main{
            width : 100%;
        }
        .child{
            position : absolute;
            right : 40px;
            top : -5px;
            font-size : 20px;
        }
        .sign-place{
            display: -webkit-box; /* wkhtmltopdf uses this one */
            display: flex;
            width: 100%
            -webkit-box-pack: space-between; /* wkhtmltopdf uses this one */
            justify-content: space-between;
            font-size: 30px;
            margin-top : 50px;
            margin-left: 150px;
        }
        .place{
            margin-left : 150px
        }
        
        </style>
      </head>
      <body>
        <div class="print-div" id="main-page-1">
            <div class="top-heading">CHANNEL PARTNER APPLICATION FORM</div>
            <h5 style = "margin-left : 40px; margin-top: 5px;">ROOF TOP SOLAR SOLUTIONS</h5>
            <h4 style = "margin-left : 50px; margin-top : 30px; margin-bottom: 5px;">A. Organization Details</h4>
            <div class="main-div" style = "margin-bottom : 900px">
                <div class="row-data" style = "display : flex;">
                    <div class="ind">
                        1
                    </div>
                    <div class="left">
                        Name of Organization
                    </div>
                    <div class="right">
                        ${data1.orgName}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        a
                    </div>
                    <div class="left">
                        GSTIN 
                    </div>
                    <div class="right">
                        ${data1.gstin}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        b
                    </div>
                    <div class="left">
                        Aadhar 
                    </div>
                    <div class="right">
                    ${data1.aadhar}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        c
                    </div>
                    <div class="left">
                        PAN 
                    </div>
                    <div class="right">
                    ${data1.pan}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        2
                    </div>
                    <div class="left">
                        Address
                    </div>
                    <div class="right">
                    ${data1.address}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        3
                    </div>
                    <div class="left">
                        City, District
                    </div>
                    <div class="right">
                    ${data1.city}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        4
                    </div>
                    <div class="left">
                        State
                    </div>
                    <div class="right">
                    ${data1.state}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        5
                    </div>
                    <div class="left">
                        Pin
                    </div>
                    <div class="right">
                    ${data1.pin}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        6
                    </div>
                    <div class="left">
                        Name of Proprietor
                    </div>
                    <div class="right">
                    ${data1.proprietorName}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        7
                    </div>
                    <div class="left">
                        Contact Number
                    </div>
                    <div class="right">
                    ${data1.contactNumber}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        8
                    </div>
                    <div class="left">
                        Email Id
                    </div>
                    <div class="right">
                    ${data1.email}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        9
                    </div>
                    <div class="left">
                        Type of Organization
                    </div>
                    <div class="right">
                    ${data1.orgType}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        10
                    </div>
                    <div class="left">
                        Network Profile 
                    </div>
                    <div class="right">
                    ${data1.networkProfile}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        a
                    </div>
                    <div class="left">
                        Specify Network Profile details 
                        
                    </div>
                    <div class="right">
                    ${data1.networkProfileDetails}
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        b
                    </div>
                    <div class="left">
                        MNRE registration for Subsidy (Yes or NO)
                    </div>
                    <div class="right">
                    ${data1.mnreRegistration}
                    </div>
                </div>
            </div>
            <h4 style = "margin-left : 50px; margin-bottom: 5px; padding-top: 50px; ">B. Eligibility Criteria & Experience</h4>
            <div class="main-div" style = "margin-bottom : 600px;">
    
                <div class="row-data">
                    <div class="ind">
                        12
                    </div>
                    <div class="l1">
                        Experience & Credentials
                    </div>
                    <div class="l2">
                       <div class="sub-li">
                            <div class="r1">
                                Number of Years of Experience in RTPV busines
                            </div>
                            <div class="r2">
                            ${data2.yearsExperience}
                            </div>
                       </div>
                        <div class="sub-li">
                            <div class="r1">
                                Total Cumulative Installed Capacity (in kW)
                            </div>
                            <div class="r2">
                            ${data2.totalCapacity}
                            </div>
                        </div>
                        <div class="sub-li">
                            <div class="r1">
                                Past Project experience
                            </br>
                                (Ticket Size of Completed Projects)
                            </div>
                            <div class="r2">
                                <p>05kW - 10kW (${data2.size5to10})W</p>
                                <p>10kW - 20kW (${data2.size10to20})W</p>
                                <p>20kW - 50kW (${data2.size20to50})W</p>
                                <p>50kW (${data2.sizeOver50})W</p>
                            </div>
                        </div>
                        <div class="sub-li">
                            <div class="r1">
                                On-Grid (in kW)
                            </div>
                            <div class="r2">
                            ${data2.onGrid}W
                            </div>
                        </div>
                        <div class="sub-li">
                            <div class="r1">
                                Off-Grid (in kW)
                            </div>
                            <div class="r2">
                            ${data2.offGrid}W
                            </div>
                        </div>
                        <div class="sub-li">
                            <div class="r1">
                                Customer Reference and 
                                Past Performance Certificates
                                (Customer List & Performance Certificate)
    
                            </div>
                            <div class="r2">
                            ${data2.customerReferences}
                            </div>
                        </div>
                        <div class="sub-li">
                            <div class="r1">
                                Network Coverage
                                (Name & Number of Districts/City Covered)
                            </div>
                            <div class="r2">
                            ${data2.networkCoverage}
                            </div>
                        </div>
                        <div class="sub-li">
                            <div class="r1">
                                End Customer Segment
                                (Residential / Institutions / Commercials / 
                                Gated Communities / SoHo / Govt. / PSU)
                            </div>
                            <div class="r2">
                            ${data2.endCustomerSegment}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        13
                    </div>
                    <div class="l1">
                    Infrastructure & Manpower
                    </div>
                    <div class="l2">
                       <div class="sub-li">
                            <div class="r1">
                            Own Space Available
                            (Office / Warehouse / Godown)
                            
                            </div>
                            <div class="r2">
                            ${data2.ownSpace}
                            </div>
                       </div>
                        <div class="sub-li">
                            <div class="r1">
                            Manpower – Sales (In Numbers)
                            </div>
                            <div class="r2">
                            ${data2.salesManpower}
                            </div>
                        </div>
                        <div class="sub-li">
                            <div class="r1">
                            Manpower – Survey (In Numbers)
                            </div>
                            <div class="r2">
                            ${data2.manpowerSurvey}
                            </div>
                        </div>
                        <div class="sub-li">
                            <div class="r1">
                            Manpower – Technical (Design & Engineering) (In Numbers)
                            </div>
                            <div class="r2">
                            ${data2.manpowerTechnical}
                            </div>
                        </div>
                        <div class="sub-li">
                            <div class="r1">
                            Manpower – Procurement  (In Numbers)
                            </div>
                            <div class="r2">
                            ${data2.manpowerProcurement}
                            
                            </div>
                        </div>
                        <div class="sub-li">
                            <div class="r1">
                            Manpower – I&C (In Numbers)
                            </div>
                            <div class="r2">
                            ${data2.manpowerIc}
                            </div>
                        </div>
                        <div class="sub-li">
                            <div class="r1">
                            Manpower – AMC (In Numbers)
                            </div>
                            <div class="r2">
                            ${data2.manpowerAMC}
                            </div>
                        </div>
                       
                    </div>
                </div>
                <div class="row-data">
                    <div class="ind">
                        14
                    </div>
                    <div class="l1">
                    Financials
                    </div>
                    <div class="l2">
                       <div class="sub-li">
                            <div class="r1">
                            Turnover – (Annual Audited Balance Sheet / Turn Over Certificate Certified by Bank / IT Return Form for Past 3 Years)
                            </div>
                            <div class="r2">
                            ${data2.turnover}
                            </div>
                       </div>
                        
                       
                    </div>
                </div>
            </div>
            <h4 style = "margin-left : 50px; margin-bottom: 5px; padding-top: 50px; ">C. Personal Details</h4>
            <div class = "third-main">
                <div class = "sign-place">
                    <div class="sign" style="position: relative;">
                        Sign : ......................
                        <div class="child" style = "top : -20px;">
                            <img style = "width : 100px" src = "${jsonData.image}">
                        </div>
                    </div>
                    <div class= "place" style= "position: relative;">
                        Place : ......................
                        <div class = "child">
                                ${data3.place}
                        </div>
                    </div>
                </div>
                <div class = "sign-place" style = "margin-top : 100px;">
                    <div class= "sign" style= "position: relative;">
                        Designation: ......................
                        <div class = "child">
                            ${data3.designation}
                        </div>
                    </div>
                    <div class= "place" style= "position: relative;">
                        Date : ......................
                        <div class = "child">
                        ${data3.date}
                        </div>
                    </div>
                </div>
                <div  style= "position: relative; margin-left : 150px; margin-top: 100px; font-size : 30px;">
                        Name : ......................
                        <div style = "position : absolute; left : 140px; top : -5px; font-size : 20px;">
                        ${data3.name}
                        </div>
                </div>
                <div class = "des" style = "width : calc(100% - 300px); margin-left : 150px;" >
                    <p style = "font-size: 32px; margin-top : 50px;">Disclaimer:</p>
                    <ul style = "font-size: 20px; padding-left : 50px; margin-top: 30px; margin-bottom : 50px;">
                        <li>I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief and I undertake to inform you of any changes therein, immediately.</li>
                        <li>This New Channel Partner Application Form is to be submitted along with Channel Partner Evaluation Form and in no way to be filled or submitted separately.</li>
                        <li>Necessary documents to be submitted along with the evaluation form to substantiate the ratings.</li>
                        <li>The documents, information and any other data will be verified and will be liable to rejection if any discrepancies found.</li>
                    </ul>
                    <h3>Note- All the fields need to be filled. </h3>
                </div>
            </div>
        </div>
      </body>
    </html>
    
    
    `
    pdf.create(htmlContent).toFile(outputPath, (err, _) => {
        if (err) {
            console.error('Error generating PDF:', err);
            res.status(500).send("Error generating PDF");
        } else {
            console.log(`PDF saved to ${outputPath}`);
            
            // Send email with the PDF attachment
            const mailOptions = {
                from: 'Authentication<shoaibkhankhan0345@gmail.com>',
                to: "shoaib.khan@codegenio.com",
                subject: 'PDF Attachment',
                text: 'Please find the attached PDF file.',
                attachments: [
                    {
                        filename: 'generated.pdf',
                        path: outputPath
                    },
                    {
                        filename: 'Image 1',
                        path : base64Images.img1
                    },
                    {
                        filename: 'Image 2',
                        path : base64Images.img2
                    },
                    {
                        filename: 'Image 3',
                        path : base64Images.img3
                    },
                    
                   
                ]
            };
            
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    res.status(500).send("Error sending email");
                } else {
                    console.log('Email sent successfully');
                    res.send('Email sent successfully');
                }
            });
        }
    });
});


app.post('/submitForm3', async (req, res) => {
    data3 = await req.body;
    jsonData.image = data3.signatureImage
    const filePath = 'signature.png';
    console.log(data3)
 
    
    res.redirect('/save');
});


const port = process.env.PORT || 3000;

// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0", function () {
  console.log(`Server is running on port ${port}`);
});

// async function main() {
//     const info = await transport.sendMail({
//       from: 'Authentication<shoaibkhankhan0345@gmail.com>', // sender address
//       to: "shoaib.khan@codegenio.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });
// }
