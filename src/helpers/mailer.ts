import  nodemailer  from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'



export const sendEmail =    async({email , emailType , userId}:any)=>{
        try{
                const hashedToken = await bcryptjs.hash(userId.toString() ,10);


                if(emailType === 'VERIFY'){

                    await User.findByIdAndUpdate(userId ,{
                        verifyToken : hashedToken,
                        verifyTokenExpiry :Date.now()  + 3600000}
                    )
                }
                else if(emailType ==='RESET'){

                    await User.findByIdAndUpdate(userId ,{
                        forgotPasswordToken : hashedToken,
                        forgotPasswordTokenExpiry :Date.now()  + 3600000}
                    )

                }
                var transport = nodemailer.createTransport({
                    host: "sandbox.smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                      user: "efbb21ed4fd1a2",
                      pass: "4830e45834d167"
                    }
                  });

                  const mailOptions = {
                    from : 'arpit@gmail.com',
                    to:email,
                    Subject : emailType === 'VERIFY'? "Verify your email":"Reset your password" ,
                html : `<p> Click <a href ="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY'? "Verify your email":"reset your password" }or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
                  }

                const mailresponse = await transport.sendMail(mailOptions);


                return mailresponse;
        }
        catch(error:any)
        {
                throw new Error(error.message);
        }
}
function async(arg0: { email: any; emailType: any; userId: any; }, arg1: (any: any) => void) {
    throw new Error('Function not implemented.');
}

