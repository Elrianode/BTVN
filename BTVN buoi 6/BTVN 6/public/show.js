$.ajax({
    url: 'http://localhost:3000/showQuestion',
    type: "GET",
    success: function(response){
      if(response){
        let all = response.yes+response.no;
        $("#sumvote").text(all);
        $("#vote_yes").text(response.yes/all*100);
        $("#vote_no").text(response.no/all*100);
        $("#show").text(response.questionContent);
      }
    },
    error: function(err){
      console.log(err);
    }
  })