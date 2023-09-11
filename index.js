const inpt = document.getElementById("input")
const searchbtn=document.getElementById("search")
const apikey="dc2cfdee-a15c-4bfc-9b15-d0eddec3eeea";
const not_found = document.querySelector('.not-found');
const defination_box = document.querySelector('.def');
const audio_box = document.querySelector('.audio-box  ');


searchbtn.addEventListener('click', e =>{
      e.preventDefault();

      const word = inpt.value;
      if(word==""){
        alert("please type a word to search")
        return;
      }
      dataGet(word);
      audio_box.innerHTML="";
      defination_box.innerHTML=""
      not_found.innerHTML=""

     
})
async function dataGet(word) {
  const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`);
  const data = await response.json();
  console.log(data);

  if (!data.length) {
    not_found.innerText = 'No result found';
    return;
}
if(typeof data[0]=='string'){//if result was a suggestion
  let heading=document.createElement("h3");
  heading.innerText="Did you mean?"
  not_found.appendChild(heading);

  data.forEach(element => {
  let suggestion= document.createElement("span")
  suggestion.classList.add("suggested")
  suggestion.innerText=element;
  not_found.appendChild(suggestion)    
  })
  return;
}
let defination=data[0].shortdef[0];//if result was found
defination_box.innerText=defination

let sound_name=data[0].hwi.prs[0].sound.audio;
if(sound_name){//if sound is available
    soundRender(sound_name)
}
}
function soundRender(sound_name){
   let sub_folder=sound_name.charAt(0);
   let sound_src=`https://media.merriam-webster.com/soundc11/${sub_folder}/${sound_name}.wav?key=${apikey}`
   let aud= document.createElement("audio");
   aud.src=sound_src
   aud.controls=true;
   audio_box.appendChild(aud);


}
 
