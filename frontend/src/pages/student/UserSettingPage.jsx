import UploadPhotoCard from "../../components/UploadPhotoCard";
import StudentImg from "../../assets/StudentImg.svg"
import UploadStudentDetailsCard from "../../components/UploadStudentDetailsCard";
// import UploadParentDetailsCard from "../../components/UploadParentDetailsCard";

const UserSettingPage=()=>{
  return <div>
  <UploadPhotoCard ImgURL={StudentImg}/>
  <UploadStudentDetailsCard/>
  {/* <UploadParentDetailsCard/> */}
</div>;
}

export default UserSettingPage;