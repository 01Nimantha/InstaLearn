const PaperCard =({QuestionID,Question,Answer1,Answer2,Answer3,Answer4})=>{
  return <div className="card" style={{margin:"2%",padding:"2%", minWidth:"96%", maxWidth:"96%",backgroundColor:"#ffffff"}}>
      <div>{Question}</div>
    <div style={{display:"flex",marginLeft:"20%"}}>
      <div>
        <input type="radio" name={QuestionID} value={Answer1}/>
        {Answer1}
      </div>
      <div style={{marginLeft:"20%"}}>
        <input type="radio" name={QuestionID} value={Answer2}/>
        {Answer2}
      </div>
    </div>
    <div style={{display:"flex",marginLeft:"20%"}}>
    <div>
      <input type="radio" name={QuestionID} value={Answer3} />
      {Answer3}
    </div>
    <div style={{marginLeft:"20%"}}>
      <input type="radio" name={QuestionID} value={Answer4} />
      {Answer4}
    </div>
    </div>
  </div>;
}

export default PaperCard;