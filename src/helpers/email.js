
const options = {
  Host: 'smtp.gmail.com',
  Username: 'hello.mirai.dev@gmail.com',
  Password: 'test Password',
  To: 'hello.mirai.dev@gmail.com',
  From: 'hello.mirai.dev@gmail.com',
  Subject: '',
  Body: '',
}

export const sendMail = ({ name, email, subject, message, phoneNumber }) => {
  Email.send({ ...options, Subject: subject, Body: message }).then(m => {
    console.log(m)
  })
  .catch(e => console.error(e))
}