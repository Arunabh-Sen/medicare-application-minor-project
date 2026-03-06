const uploadImageToCloudinary = async (file) => {
    const uploadData = new FormData();

    uploadData.append("file", file);
    uploadData.append("upload_preset", "medicare-app"); // Replace with your preset
    uploadData.append("cloud_name", "dxyz123"); // Replace with your cloud name

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxyz123/image/upload",
        {
            method: "post",
            body: uploadData,
        }
    );

    const data = await res.json();

    return data;
};

export default uploadImageToCloudinary;
