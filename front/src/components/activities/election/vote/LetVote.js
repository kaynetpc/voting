import ReactVote from 'react-vote';

function LetVote() {

    const style = {};
    
    return (
        <div>
            <ReactVote
            data={dataDD}
            styles={style}
            text={"customText"}
            onCreate={(data, diff) => console.log("Create", data, diff)}
            onUpvote={() => console.log("UpVote")}
            onClose={() => console.log("onClose")}
            onReset={() => console.log("rest")}
            isAdmin={true}
            clientId={"clientId"}
            />
            
        </div>
    )
}

export default LetVote


 const dataDD = {
    title: "Title", // Title of vote
    items: [ // Array of vote options
      {
        title: "t-item", // Title of option
        count: 2, // Number of votes
        total: 5, // Number of total votes(including downvote)
        reason: true, // Need to put reason why voted
        reasons: ["res"], // Array of reasons why voted
        voters: ["a","b"], // Array of unique identifers of all voters for this option
        downvoters: ["c","d"], // only downvoters
        upvoters: ["e","f"] ,// only upvoters
        adder: "g" // Unique identifier of the one who added this item(for expandable vote)
      }
    ],
    closed: false, // Whether this vote is closed or not. If this prop is true, you can only see the result, otherwise you can toggle between voting view and result view.
    voters: ["a","b","c", "d", "e", "f", "g"] ,// Array of unique identifiers of all voters.
    autoClose: 7 ,// Number which closes vote when reached
    multiple: false ,// Whether voters can choose multiple options
    expansion: false, // Whether voters can add new option
    downvote: false, // Whether to allow downvote
    showTotal: true, // Whether to show total votes in result view
    creator: "kay" // Unique identifier of the one who create this vote.
  }