export  function SimpleText({text}) {
    return (
        <div style={{...styleSimpleText.spaceFeedback}}>
         {text? text: "No record"}
        </div>
    )
}

const styleSimpleText = {
    spaceFeedback: {
        width: '100%', fontSize: "30px", fontWeight: 'bolder', textAlign: 'center', color: "#cfcfcf", fontStyle: 'oblique',
    }
}