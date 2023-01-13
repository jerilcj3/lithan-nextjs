const Mautic = require('mautic')
import requestIp from 'request-ip'


const client = new Mautic({
  baseUrl: 'https://mautic.educlaas.com/api',
  auth: {
    username: 'educlaas',
    password: 'educlaas*2@3$1#'
  }
})


export default async function handler(req, res) {
  const detectedIp = requestIp.getClientIp(req)
  const response = await client.contacts.list({ search: `ip: ${detectedIp}` })
  const contactFields = Object.values(response.data.contacts)[0].fields  
  res.status(200).json({ title: contactFields.all.title, firstname: contactFields.all.firstname, email: contactFields.all.email, phone: contactFields.all.phone, country: contactFields.all.country  })
}
