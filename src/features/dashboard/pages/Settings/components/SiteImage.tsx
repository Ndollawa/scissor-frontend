import React, { ChangeEvent } from "react";
import LightGallery from 'lightgallery/react'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
// import 'lightgallery/css/lg-thumbnail.css'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
// import 'lightgallery/css/lg-thumbnail.css'
import {
  useSettingsUploadMutation,
  useSettingsRemoveFileMutation
} from "../settingApiSlice";
import { useSettings } from "../settingsConfigSlice";
import { useSelector } from "react-redux";
import showToast from "../../../../../app/utils/hooks/showToast";
import { FaTrash } from "react-icons/fa";

const SiteImage = () => {
  const settings = useSelector(useSettings);
  const {
    _id,
    siteImages: {
      favicon,
      logo,
      logoIcon,
      logoDark,
      aboutUsBg,
      pagesBg,
      backgroundImage,
    },
  } = settings;
  // const {uploadFile} = useFileUpload()
  const [settingsUpload, { isSuccess, isError, error }]: any = useSettingsUploadMutation();
  const [
    removeFile,
    {
      isSuccess: removeFileIsSuccess,
      isError: removeFileIsError,
      error: removeFileError,
    },
  ]: any = useSettingsRemoveFileMutation();

  const handleFaviconUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    const formData = new FormData();
    formData.append("siteImage", files[0]!);
    formData.append("_id", _id);
    formData.append("type", "favicon");
    //
    await settingsUpload(formData);
    if (isError) {
    return  showToast(
        "error",
        `Sorry, couldn't Upload Favicon: ${error.data.message}`
      );
    }
    showToast("success", "Favicon Uploaded successfully");
  }
  const handleLogoIconUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    const formData = new FormData();
    formData.append("siteImage", files[0]!);
    formData.append("_id", _id);
    formData.append("type", "logoIcon");
    await settingsUpload(formData);
    if (isError) {
   return   showToast("error", `Sorry, couldn't Upload Logo Icon: ${error.data.message}`);
    }

      showToast("success", "Logo Icon Uploaded successfully");
  }
  const handleLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    const formData = new FormData();
    formData.append("siteImage", files[0]!);
    formData.append("_id", _id);
    formData.append("type", "logo");
    await settingsUpload(formData);
    if (isError) {
   return   showToast("error", `Sorry, couldn't Upload Logo: ${error.data.message}`);
    }

      showToast("success", "Logo Uploaded successfully");
  }
  const handleDarkLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    const formData = new FormData();
    formData.append("siteImage", files[0]!);
    formData.append("_id", _id);
    formData.append("type", "darklogo");
    //
    await settingsUpload(formData);
    if (isError) {
    return  showToast(
        "error",
        `Sorry, couldn't Upload Dark Logo: ${error.data.message}`
      );
    }
   
      showToast("success", "Dark Logo Uploaded successfully");
  
  }
  const handleAboutUsImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    const formData = new FormData();
    formData.append("siteImage", files[0]!);
    formData.append("_id", _id);
    formData.append("type", "aboutUsBg");
    //
    await settingsUpload(formData);
    if (isError) {
    return  showToast(
        "error",
        `Sorry, couldn't Upload About us Image: ${error.data.message}`
      );
    }

      showToast("success", "About us Image Uploaded successfully");
  
  }
  const handlePageBackgroundUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files!;
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("siteImage", files[0]!);
    formData.append("type", "pageBg");
    //
    await settingsUpload(formData);
    if (isError) {
     return showToast(
        "error",
        `Sorry, couldn't Upload Pages Background Image: ${error.data.message}`
      );
    }
      showToast("success", "Pages Background Image Uploaded successfully");
   
  }

  const handleBackgroundUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    const formData = new FormData();
    formData.append("siteImage", files[0]!);
    formData.append("_id", _id);
    formData.append("type", "bgImage");
    //
    await settingsUpload(formData);
    if (isError) {
    return  showToast(
        "error",
        `Sorry, couldn't Upload Background Image: ${error.data.message}`
      );
    }
    showToast("success", "Background Image Uploaded successfully");
    
  }

  const removeImage = async (file: string, type: string) => {
    if (file) {
      await removeFile({ _id, file, type });
      if (removeFileIsError) {
    return    showToast(
          "error",
          `Sorry, couldn't remove Image: ${removeFileError.data.message}`
        );
      }
      showToast("success", " Image removed successfully");
    }
  }

  return (
    <div className="card">
      <div className="card-header bg-primary">
        <h4 className="card-title text-white">Site Images</h4>
      </div>
      <div className="card-body">
        <div className="row align-center">
          <div className="col-md-6">
            <label className="form-label">Favicon</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  accept=".jpeg, .jpg, .png, .gif"
                  id="favicon"
                  className="form-file-input form-control"
                  onChange={handleFaviconUpload}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            <div id="sitefavicon">
              {favicon && (
                <div
                  style={{
                    backgroundColor: "#ccc",
                    padding: "10px",
                    border: "2px solid #f68600",
                    borderRadius: "2%",
                  }}
                  className="container position-relative w-100"
                ><LightGallery plugins={[lgZoom]} > <a href={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+favicon}   data-exthumbimage={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+favicon} data-src={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+favicon} data-title='favicon'>
                <img
                    className="img-responsive offset-1"
                    src={
                      process.env.REACT_APP_BASE_URL +
                      "/uploads/settings/" +
                      favicon
                    }
                    alt="favicon"
                    width="50"
                  /></a></LightGallery>
                 
                  <div
                    className="position-absolute top-0"
                    onClick={() => removeImage(favicon, "favicon")}
                  >
                    <FaTrash color="red" cursor={"pointer"} fontSize={"1rem"} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Logo Icon</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  id="logoIcon"
                  accept=".jpeg, .jpg, .png, .gif"
                  name="logoIcon"
                  onChange={handleLogoIconUpload}
                  className="form-file-input form-control"
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            <div id="sitelogo">
              {" "}
              {logoIcon && (
                <div
                  style={{
                    backgroundColor: "#ccc",
                    padding: "10px",
                    border: "2px solid #f68600",
                    borderRadius: "2%",
                  }}
                  className="container position-relative w-100"
                >
                  <LightGallery plugins={[lgZoom]} > <a href={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+logoIcon}   data-exthumbimage={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+logoIcon} data-src={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+logoIcon} data-title='logoIcon'>
                <img
                    className="img-responsive offset-1"
                    src={
                      process.env.REACT_APP_BASE_URL +
                      "/uploads/settings/" +
                      logoIcon
                    }
                    alt="logoIcon"
                    width="50"
                  /></a></LightGallery>
 
                  <div
                    className="position-absolute top-0"
                    onClick={() => removeImage(logoIcon, "logoIcon")}
                  >
                    <FaTrash color="red" cursor={"pointer"} fontSize={"1rem"} />
                  </div>
                </div>
              )}{" "}
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Logo</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  id="logo"
                  accept=".jpeg, .jpg, .png, .gif"
                  name="logo"
                  onChange={handleLogoUpload}
                  className="form-file-input form-control"
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            <div id="sitelogo">
              {" "}
              {logo && (
                <div
                  style={{
                    backgroundColor: "#ccc",
                    padding: "10px",
                    border: "2px solid #f68600",
                    borderRadius: "2%",
                  }}
                  className="container position-relative w-100"
                ><LightGallery plugins={[lgZoom]} > <a href={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+logo}   data-exthumbimage={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+logo} data-src={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+logo} data-title='logo'>
                <img
                    className="img-responsive offset-1"
                    src={
                      process.env.REACT_APP_BASE_URL +
                      "/uploads/settings/" +
                      logo
                    }
                    alt="logo"
                    width="200"
                  /></a></LightGallery>

                  <div
                    className="position-absolute top-0"
                    onClick={() => removeImage(logo, "logo")}
                  >
                    <FaTrash color="red" cursor={"pointer"} fontSize={"1rem"} />
                  </div>
                </div>
              )}{" "}
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Dark Logo</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  id="darklogo"
                  accept=".jpeg, .jpg, .png, .gif"
                  name="darklogo"
                  className="form-file-input form-control"
                  onChange={handleDarkLogoUpload}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            <div id="sitebrandname_logo">
              {logoDark && (
                <div
                  style={{
                    backgroundColor: "#ccc",
                    padding: "10px",
                    border: "2px solid #f68600",
                    borderRadius: "2%",
                  }}
                  className="container position-relative w-100"
                ><LightGallery plugins={[lgZoom]} > <a href={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+logoDark}   data-exthumbimage={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+logoDark} data-src={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+logoDark} data-title='logoDark'>
                <img
                    className="img-responsive offset-1"
                    src={
                      process.env.REACT_APP_BASE_URL +
                      "/uploads/settings/" +
                      logoDark
                    }
                    alt="logoDark"
                    width="200"
                  /></a></LightGallery>
                  <div
                    className="position-absolute top-0"
                    onClick={() => removeImage(logoDark, "logoDark")}
                  >
                    <FaTrash color="red" cursor={"pointer"} fontSize={"1rem"} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">About Us Image</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  id="loader-up"
                  accept=".jpeg, .jpg, .png, .gif,.svg"
                  name="loader"
                  className="form-file-input form-control"
                  onChange={handleAboutUsImageUpload}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            <div id="about-us">
              {aboutUsBg && (
                <div
                  style={{
                    backgroundColor: "#ccc",
                    padding: "10px",
                    border: "2px solid #f68600",
                    borderRadius: "2%",
                  }}
                  className="container position-relative w-100"
                ><LightGallery plugins={[lgZoom]} > <a href={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+aboutUsBg}   data-exthumbimage={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+aboutUsBg} data-src={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+aboutUsBg} data-title='aboutUsBg'>
                <img
                    className="img-responsive offset-1"
                    src={
                      process.env.REACT_APP_BASE_URL +
                      "/uploads/settings/" +
                      aboutUsBg
                    }
                    alt="aboutUsBg"
                    width="200"
                  /></a></LightGallery>
                  <div
                    className="position-absolute top-0"
                    onClick={() => removeImage(aboutUsBg, "aboutUsBg")}
                  >
                    <FaTrash color="red" cursor={"pointer"} fontSize={"1rem"} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Pages Background Image</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  id="pages-background_image-up"
                  accept=".jpeg, .jpg, .png, .gif,.svg"
                  name="pages-background_image"
                  className="form-file-input form-control"
                  onChange={handlePageBackgroundUpload}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            <div id="pages-background_image">
              {pagesBg && (
                <div
                  style={{
                    backgroundColor: "#ccc",
                    padding: "10px",
                    border: "2px solid #f68600",
                    borderRadius: "2%",
                  }}
                  className="container position-relative w-100"
                ><LightGallery plugins={[lgZoom]} > <a href={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+pagesBg}   data-exthumbimage={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+pagesBg} data-src={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+pagesBg} data-title='pagesBg'>
                <img
                    className="img-responsive offset-1"
                    src={
                      process.env.REACT_APP_BASE_URL +
                      "/uploads/settings/" +
                      pagesBg
                    }
                    alt="pagesBg"
                    width="200"
                  /></a></LightGallery>
                  <div
                    className="position-absolute top-0"
                    onClick={() => removeImage(pagesBg, "pagesBg")}
                  >
                    <FaTrash color="red" cursor={"pointer"} fontSize={"1rem"} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Home Background Image</label>
            <div className="input-group mb-3 col-md-5">
              <div className="form-file">
                <input
                  type="file"
                  id="background_image-up"
                  accept=".jpeg, .jpg, .png, .gif,.svg"
                  name="background_image"
                  className="form-file-input form-control"
                  onChange={handleBackgroundUpload}
                />
              </div>
              <span className="input-group-text">Upload</span>
            </div>
          </div>
          <div className="col-md-6">
            <div id="sitebackground_image">
              {backgroundImage && (
                <div
                  style={{
                    backgroundColor: "#ccc",
                    padding: "10px",
                    border: "2px solid #f68600",
                    borderRadius: "2%",
                  }}
                  className="container position-relative w-100"
                ><LightGallery plugins={[lgZoom]} > <a href={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+backgroundImage}   data-exthumbimage={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+backgroundImage} data-src={process.env.REACT_APP_BASE_URL+"/uploads/settings/"+backgroundImage} data-title='backgroundImage'>
                <img
                    className="img-responsive offset-1"
                    src={
                      process.env.REACT_APP_BASE_URL +
                      "/uploads/settings/" +
                      backgroundImage
                    }
                    alt="backgroundImage"
                    width="200"
                  /></a></LightGallery>
                  <div
                    className="position-absolute top-0"
                    onClick={() =>
                      removeImage(backgroundImage, "backgroundImage")
                    }
                  >
                    <FaTrash color="red" cursor={"pointer"} fontSize={"1rem"} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SiteImage);
