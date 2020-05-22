import React, { useState } from 'react';
import './App.css';

function App() {
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('Choose File')
    const [validImg, setValidImg] = useState(false)
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        let userImage = e.target.files[0]
        let reader = new FileReader();
        reader.onload = function (event) {
            // The file's text will be printed here
            let img = new Image();

            img.onload = function () {
                let height = img.height;
                let width = img.width;
                if (height === 1024 && width === 1024) {
                    setFile(userImage)
                    setFileName(userImage.name)
                    setValidImg(true)
                }
                else {
                    setValidImg(false)
                }
            }

            img.src = event.target.result;
        };

        reader.readAsDataURL(userImage);
    }

    const handleUpload = async (file) => {
        setLoading(true)
        const getImg = async (type) => {
            const data = new FormData()
            data.append("file", file)
            data.append("upload_preset", type)

            const res = await fetch('https://api.cloudinary.com/v1_1/dfu8kqztl/image/upload', {
                method: "POST",
                body: data
            })
            return res.json()


        }
        const img1 = await getImg('paytm_horizontal')
        const img2 = await getImg('paytm_vertical')
        const img3 = await getImg('paytm_horizontal_ small')
        const img4 = await getImg('paytm_gallery')
        setLoading(false)
        setImg1(img1.secure_url)
        setImg2(img2.secure_url)
        setImg3(img3.secure_url)
        setImg4(img4.secure_url)


    }
    return (
        <div className="container" >
            <h1 className="font-weight-light text-center">Transform Image</h1>
            <div className="row justify-content-center">

                <div className="col-5 mt-5">

                    <div className="form-group">


                        <div className="custom-file">
                            <input type="file" className="custom-file-input" onChange={handleChange} />
                            <label className="custom-file-label">{fileName}</label>
                        </div>
                    </div>
                    {
                        validImg &&
                        <div>
                            <p className="text-success" >
                                Image is Valid

                            </p>
                            <button className="btn btn-outline-dark" onClick={() => handleUpload(file)} >Upload</button>
                        </div>

                    }
                    {
                        !validImg && <p className="text-danger" >
                            Select an image of size 1024 x 1024.
                </p>
                    }

                </div>
            </div>
            <div className="col-12 mt-4">
                {loading && <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>}
                {img1 && <h3 className="text-center" >All Sizes</h3>}
                <div className="row justify-content-center">
                    <img src={img1} alt="" className="rounded" />
                </div>
            </div>
            {img1 && <h4 className="text-center" > Horizontal : 755 x 450 </h4>}
            <div className="col-12 mt-4">
                <div className="row justify-content-center">
                    <img src={img2} alt="" className="rounded" />
                </div>
                {img2 && <h4 className="text-center" >Vertical : 365 x 450 </h4>}
            </div>
            <div className="col-12 mt-4">
                <div className="row justify-content-center">
                    <img src={img3} alt="" className="rounded" />
                </div>
                {img3 && <h4 className="text-center" >Horizontal small : 365 x 212 </h4>}
            </div>
            <div className="col-12 mt-4">
                <div className="row justify-content-center">

                    <img src={img4} alt="" className="rounded" />
                </div>
                {img4 && <h4 className="text-center" >Gallery : 380 x 380</h4>}
            </div>
        </div>
    )
}

export default App;



