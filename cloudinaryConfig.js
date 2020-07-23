const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name : 'desulkq5j',
    api_key : '179749593743477',
    api_secret: '8vBGR_9l0Ddpv-bmdfXBNsOhYUg'
})



exports.uploads = (file) =>{
    return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) =>{
    resolve({url: result.url, id: result.public_id})
    }, {resource_type: "auto"})
    })
}