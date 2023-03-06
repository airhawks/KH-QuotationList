import * as React from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Editor({ data = {}, onChange = () => {} }) {
  const [formData, setData] = React.useState(data);
  const { description, image, HSN_SAC, quantity, rate } = formData;

  const onChangeField = (field, value) => {
    const updatedData = {
      ...formData,
      [field]: value,
    };
    setData(updatedData);
    onChange(updatedData);
  };
  React.useEffect(() => {
    onChange(formData);
  }, []);

  const loadFile = (event) => {
    const file = event.target.files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
      contentType: file.type,
    };

    const storage = getStorage();
    const storageRef = ref(storage, name);
    uploadBytes(storageRef, file, metadata).then(async (snapshot) => {
      const url = await getDownloadURL(snapshot.ref);
      onChangeField("image", url);
      console.log("Uploaded a", url);
    });
  };
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          defaultValue={description}
          onChange={(e) => onChangeField("description", e.target.value)}
        />

        <label htmlFor="description" className="mt-3 form-label">
          Image
        </label>
        <input
          className="form-control"
          id="image"
          type="file"
          accept="image/*"
          onChange={loadFile}
        />
        {image ? <img className="w-100" src={image} alt="hat be" /> : null}

        <label htmlFor="HSN/SAC" className="mt-3 form-label">
          HSN/SAC
        </label>
        <input
          className="form-control"
          id="HSN/SAC"
          defaultValue={HSN_SAC}
          onChange={(e) => onChangeField("HSN_SAC", e.target.value)}
        />
        <label htmlFor="quantity" className="mt-3 form-label">
          Quantity
        </label>
        <input
          className="form-control"
          id="quantity"
          defaultValue={quantity}
          onChange={(e) => onChangeField("quantity", e.target.value)}
        />
        <label htmlFor="rate" className="mt-3 form-label">
          Rate
        </label>
        <input
          className="form-control"
          id="rate"
          defaultValue={rate}
          onChange={(e) => onChangeField("rate", e.target.value)}
        />
      </div>
    </form>
  );
}
