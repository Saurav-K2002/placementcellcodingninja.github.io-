import React,{useState} from 'react'
import { Alert,Col, Row,Form,Button, Container,FloatingLabel} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SetCollegeProfile() {
  const [desc,setDesc] = useState("");
  const [file,setFile] = useState(null);
  const [web,setWeb] = useState("");
  const [msg,setMsg] = useState("");
  const [style,setStyle] = useState("danger");
  const navigate = useNavigate();
  const handleClick = (e)=>{
    e.preventDefault() ;
    console.log(localStorage.getItem('jwtToken'));
    if(desc ==="" || file ==="" || web ==="" )
    {
      setMsg("ALL FIELDS REQUIRED");
      return;
    }
    let fd = new FormData() ; 
    fd.append("profileImg",file) ; 
    fd.append("description",desc) ; 
    fd.append("website",web)
    const data = {
      headers:{
        authorization: localStorage.getItem("accessToken"),
        'Content-Type': 'multipart/form-data'
      }
    }
    console.log(fd)
    axios.patch("http://localhost:5000/college/update/profile",fd,data).then(
      (resp)=>{
        if(resp.status === 202){
        setMsg("Successfully Updated");
        setStyle("success");
        localStorage.removeItem('accessToken');
        setTimeout(()=>{navigate("/institutelogin")},2000);}
      }
    ).catch((err)=>{setMsg(err.response.data.message);console.error(err);})
  }


  return (
    <Container fluid>
        <Row style={{backgroundColor:"black",padding:"20px"}}>
        <div style={{color:"white",backgroundColor:"black",fontSize:"160%",fontWeight:"bold",fontFamily:"sans-serif"}}>Virtual Placement Cell</div>
    </Row>
    <div style={{fontSize:"250%",textAlign:"center",marginTop:"2%",fontWeight:"bolder"}}>
        FINAL STEP
    </div>
    <div style={{fontSize:"180%",textAlign:"center",marginBottom:"3%"}}>
        KINDLY SET UP YOUR PROFILE
    </div>
    <Form>
                   <FloatingLabel label="Description" className="mb-3">
                   <Form.Control onChange = {(e)=>{setDesc(e.target.value);}} required as="textarea" style={{height:"130px"}} maxLength="1000" placeholder="description about company"/>
                   </FloatingLabel>
                 <FloatingLabel label="Website" className="mb-3">
                   <Form.Control  onChange = {(e)=>{setWeb(e.target.value);}} required type="text" placeholder="website" />
                   </FloatingLabel>
                   <Form.Group className="mb-3" >
    <Form.Label style={{fontWeight:"bolder"}}>New Image</Form.Label>
    <Form.Control  onChange = {(e)=>{setFile(e.target.files[0]);}} type="file" placeholder="Image" />
    </Form.Group>
    {msg&&
            <Alert variant={style} style={{marginBottom:"3%"}} onClose={() => setMsg("")} dismissible>
        {msg}
      </Alert>}
    <div  style={{display:"flex",justifyContent:"center"}}>
    <Button onClick={handleClick} className='but1 px-4 py-1'>SUBMIT</Button>
    </div>
                 </Form>
    </Container>
  )
}
export default SetCollegeProfile
