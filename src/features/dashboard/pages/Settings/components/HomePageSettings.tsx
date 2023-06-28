import React,{FormEvent,FormEventHandler,useState}  from 'react';
import {BsToggleOff ,BsToggleOn} from 'react-icons/bs';
import { useSelector,useDispatch } from 'react-redux';
import { useLandingPageConfig } from '../settingsConfigSlice';
import { useHomepageSettingsMutation } from '../settingApiSlice';
import { setAppHomepageSetting,useSettings } from '../settingsConfigSlice';
import useInput from '../../../../../app/utils/hooks/useInput';
import showToast from '../../../../../app/utils/hooks/showToast';

const HomePageSettings = () => {

const dispatch= useDispatch();
const [homepageSettings,isLoading]=useHomepageSettingsMutation();

const {_id} = useSelector(useSettings)
const homeSettings = useSelector(useLandingPageConfig);


const [affiliateToggle, setAffiliateToggle] = useState(homeSettings.showAffiliate)
const [testimonialToggle, setTestimonialToggle] = useState(homeSettings.showTestimonial)
const [blogToggle, setBlogToggle] = useState(homeSettings.showBlog)

const [aboutUsStyle, setAboutUsStyle, AboutUsStyleAttr] = useInput(homeSettings.aboutStyle)
const [whatweOfferStyle, setWhatWeOfferStyle, WhatWeOfferStyleAttr] = useInput(homeSettings.whatWeOfferStyle)
const [navstyle, setNavStyle, NavStyleAttr] = useInput(homeSettings.navStyle)
const [testimonialStyle, setTestimonialStyle, TestimonialStyleAttr] = useInput(homeSettings.testimonialStyle)
const [serviceStyle, setServiceStyle, serviceStyleAttr] = useInput(homeSettings.serviceStyle)
const [sliderstyle, setSliderStyle, SliderStyleAttr] = useInput(homeSettings.sliderStyle)
const [ourBenefitstyle, setOurBenefitStyle, OurBenefitStyleAttr] = useInput(homeSettings.ourBenefitStyle)

const styleOptions = [1,2,3].map((option, i)=><option key={i} value={option}>Style {option}</option>)

const updateSetting:FormEventHandler = async(e:FormEvent)=>{
e.preventDefault()
const data={
  navStyle:navstyle,
  sliderStyle:sliderstyle,
  aboutStyle:aboutUsStyle,
  testimonialStyle,
  serviceStyle,
  ourBenefitStyle:ourBenefitstyle,
  whatWeOfferStyle:whatweOfferStyle
}
try {
  await homepageSettings({_id,data}).unwrap()
   dispatch(setAppHomepageSetting(data))
   showToast('success',"Settings Updated successfully!")

  }  catch (error:any) {
    showToast('error',error)
}

}
const handleAffiliateToggle = async ()=>{
  let data={showAffiliate:affiliateToggle}
  try {
    await homepageSettings({_id,data}).unwrap()
     dispatch(setAppHomepageSetting(data))
     showToast('success',"Settings Updated successfully!")
  }  catch (error:any) {
    showToast('error',error)
  }
}
const handleBlogToggle =  async()=>{
  let data={showBlog:blogToggle}
  try {
    await homepageSettings({_id,data}).unwrap()
     dispatch(setAppHomepageSetting(data))
     showToast('success',"Settings Updated successfully!")

    }  catch (error:any) {
      showToast('error',error)
  }
}
const handleTestimonialToggle =  async()=>{
  let data={showTestimonial:testimonialToggle}
  try {
    await homepageSettings({_id,data}).unwrap()
     dispatch(setAppHomepageSetting(data))
     showToast('success',"Settings Updated successfully!")

    }  catch (error:any) {
      showToast('error',error)
  }
}
  return (
    <>
    <div className="card">
      <div className="card-header bg-primary">
        <h4 className="card-title text-white">Home Page</h4>
      </div>
      <div className="card-body">
        <div className="basic-form">
          <form onSubmit={updateSetting}> 
            <div className="row">
            <div className="my-20 col-md-12 d-flex justify-content-between">
              <div><strong>Show Affiliate Section</strong></div>
              <div className=''>
                <label htmlFor='affiliateToggle'  className='p-10'>{affiliateToggle?<BsToggleOn className='text-primary' fontSize={'2rem'}/>:<BsToggleOff className='text-default' fontSize={'2rem'}/>}</label>
                <input
                id="affiliateToggle"
                type="checkbox"
                  className="setting-checkbox d-none"
                  checked={affiliateToggle}
                  onClick={()=>{setAffiliateToggle((prev:boolean)=>!prev);
                  handleAffiliateToggle()}}
                />
                 </div>
              </div><br/>
            <div className="mb-15 col-md-12 d-flex justify-content-between align-center">
              <div><strong>Show Blog Section</strong></div>
              <div>
                <label htmlFor="blogToggle" className="p-10">{blogToggle?<BsToggleOn className='text-primary' fontSize={'2rem'}/>:<BsToggleOff className='text-default' fontSize={'2rem'}/>}</label>
                <input
                id='blogToggle'
                type="checkbox"
                  className="setting-checkbox d-none"
                  checked={blogToggle}
                  onClick={()=>{setBlogToggle((prev:boolean) => !prev);
                    handleBlogToggle()
                  }}
                />
                 </div>
              </div><br/>
            <div className="my-20 col-md-12 d-flex justify-content-between">
              <div><strong>Show Testimonial Section</strong></div>
              <div>
                <label htmlFor='testimonialToggle' className="p-10">{testimonialToggle?<BsToggleOn className='text-primary' fontSize={'2rem'}/>:<BsToggleOff className='text-default' fontSize={'2rem'}/>}</label>
                <input
                id='testimonialToggle'
                type="checkbox"
                  className="setting-checkbox d-none"
                  checked={testimonialToggle}
                  onChange={()=>{setTestimonialToggle((prev:boolean)=> !prev);
                  handleTestimonialToggle()}}
                />
                 </div>
              </div>
             <br/>
             <br/>
             <br/>
            <div className="mb-3 col-md-4">
                <label className="form-label"><strong>Navbar Style</strong></label>
                <select
                  className="default-select form-control wide"
                  value={navstyle}
                  onChange={setNavStyle}
                  {...NavStyleAttr}
                >
                  <option value="">Choose...</option>
                 {styleOptions}
                </select>
              </div>
              
              <div className="mb-3 col-md-4">
                <label className="form-label"><strong>Slider Style</strong></label>
                <select
                  className="default-select form-control wide"
                  value={sliderstyle}
                  onChange={setSliderStyle}
                  {...SliderStyleAttr}
                >
                  <option value="">Choose...</option>
                 {styleOptions}
                </select>
              </div>
              <div className="mb-3 col-md-4">
                <label className="form-label"><strong>About Us Style</strong></label>
                <select
                  className="default-select form-control wide"
                  value={aboutUsStyle}
                  onChange={setAboutUsStyle}
                  {...AboutUsStyleAttr}
                >
                  <option value="">Choose...</option>
                  {styleOptions}
                </select>

            </div>
              
            <div className="mb-3 col-md-4">
                <label className="form-label"><strong>Service  Style</strong></label>
                <select
                  className="default-select form-control wide"
                  value={serviceStyle}
                  onChange={setServiceStyle}
                  {...serviceStyleAttr}
                >
                  <option value="">Choose...</option>
                  {styleOptions}
                </select>
              </div>
              
            <div className="mb-3 col-md-4">
                <label className="form-label"><strong>What We Offer  Style</strong></label>
                <select
                  className="default-select form-control wide"
                  value={whatweOfferStyle}
                  onChange={setWhatWeOfferStyle}
                  {...WhatWeOfferStyleAttr}
                >
                  <option value="">Choose...</option>
                  {styleOptions}
                </select>
              </div>

              <div className="mb-3 col-md-4">
                <label className="form-label"><strong>Testimonial Style</strong></label>
                <select
                  className="default-select form-control wide"
                  value={testimonialStyle}
                  onChange={setTestimonialStyle}
                  {...TestimonialStyleAttr}
                >
                  <option value="">Choose...</option>
                  {styleOptions}
                </select>
              </div>
              <div className="mb-3 col-md-4">
                <label className="form-label"><strong>Our Benefit Style</strong></label>
                <select
                  className="default-select form-control wide"
                  value={ourBenefitstyle}
                  onChange={setOurBenefitStyle}
                  {...OurBenefitStyleAttr}
                >
                  <option value="">Choose...</option>
                  {styleOptions}
                </select>

            </div>
                {/*  <div className="mb-3 col-md-4">
                <label className="form-label"><strong>Primary Colour</strong></label>
                <input
                  type="color"
                  className="form-control"
                  placeholder=""
                  value={primaryColour}
                  onChange={setPrimaryColour}
                  {...PrimaryColourAttr}
                />
              </div>
           
           <div className="mb-3 col-md-4">
                <label className="form-label"><strong>Secondary Colour </strong></label>
                <input
                  type="color"
                  className="form-control"
                  placeholder=""
                  value={WhatWeOfferStyle}
                  onChange={setSecondaryColour}
                  {...SecondaryColourAttr}
                />
              </div> */}
               
            </div>
            <div className="card-footer d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
             Save Changes
            </button></div>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default React.memo(HomePageSettings)