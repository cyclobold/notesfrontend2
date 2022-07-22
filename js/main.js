const messenger = (function(){

     const showMessage = (type, message) => {
     
          const  allowed_types = ['success', 'error', 'warning'];

          if(allowed_types.includes(type)){
               return `<div class='alert alert-${type}'>${message}</div>`
          }


     }


     return {
          showMessage: showMessage
     }


}())

const mainer = (function(messenger){
     "use strict"
     let post_content_editor = CKEDITOR.replace("post_content")


     //create Note
     if(document.querySelector("#create-note-form")){
          const createNoteForm = document.querySelector("#create-note-form");

          //for submit
          createNoteForm.addEventListener("submit", function(event){
               event.preventDefault();

               let post_title = this.post_title.value.trim();
               let post_content = post_content_editor.getData();

               // console.log(post_title)
               // console.log(post_content)

               post_content.length > 0 && post_title.length > 0 ? createNote(post_title, post_content) : null; 



          })
     }



     async function createNote() {
          console.log(arguments)
          const feedback = await axios.post("http://localhost:3000/create-note", {
               post_title: arguments[0],
               post_content: arguments[1]
          });

          if(feedback.data.code == "success"){
               const message_feedback = messenger.showMessage("success", "Noted created");
               document.querySelector("#form-info").innerHTML = message_feedback

          }


     }

   

}(messenger))


