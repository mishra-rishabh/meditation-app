const app = () =>
{
  const song = document.querySelector( ".song" ) ;
  const play = document.querySelector( ".play" ) ;
  const outline = document.querySelector( ".moving-outline circle" ) ;
  const video = document.querySelector( ".vid-container video" ) ;

  // sounds
  const sounds = document.querySelectorAll(".sound-picker button" ) ;

  // time display
  const timeDisplay = document.querySelector( ".time-display" ) ;
  const timeSelect = document.querySelectorAll( ".time-select button" ) ;
  // get the length of the outline
  const outlineLength =  outline.getTotalLength() ;
  // console.log( outlineLength ) ;

  // duration
  let fakeDuration = 600 ;

  outline.style.strokeDasharray = outlineLength ;
  outline.style.strokeDashoffset = outlineLength ;

  // pick different sound
  sounds.forEach( sound =>
    {
      sound.addEventListener( "click" , function()
      {
        song.src = this.getAttribute( "data-sound" ) ;
        video.src = this.getAttribute( "data-video" ) ;
        checkPlaying( song ) ;
      } ) ;
    } ) ;

  // play sound
  play.addEventListener( "click", () =>
  {
    checkPlaying( song ) ;
  } ) ;

  // select sound
  timeSelect.forEach( option =>
    {
      option.addEventListener( "click" , function()
      {
        fakeDuration = this.getAttribute( "data-time" ) ;
        timeDisplay.textContent = `${ Math.floor( fakeDuration / 60 ) }:${ Math.floor( fakeDuration % 60 ) }0` ;
      } ) ;
    } ) ;

  // create a function to stop and play the sound
  const checkPlaying = song =>
  {
    if( song.paused )
    {
      song.play() ;
      video.play() ;
      play.src = "assets/svg/pause.svg" ;
    }
    else
    {
      song.pause() ;
      video.pause() ;
      play.src = "assets/svg/play.svg" ;
    }
  } ;

  // song time and circle animation
  song.ontimeupdate = () =>
  {
    let currentTime = song.currentTime ;
    let elapsedTime = fakeDuration - currentTime ;
    let seconds = Math.floor( elapsedTime % 60 ) ;
    let minutes = Math.floor( elapsedTime / 60 ) ;

    // animate the circle
    let progress = outlineLength - ( currentTime / fakeDuration ) * outlineLength ;
    outline.style.strokeDashoffset = progress ;

    // animate the text
    timeDisplay.textContent = `${ minutes }:${ seconds }` ;

    if( currentTime >= fakeDuration )
    {
      song.pause() ;
      video.pause() ;
      song.currentTime = 0 ;
      play.src = "assets/svg/play.svg" ;
    }
  }

} ;

app() ;