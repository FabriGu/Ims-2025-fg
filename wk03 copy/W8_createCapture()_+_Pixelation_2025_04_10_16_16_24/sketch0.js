// Declare a variable to hold the video feed
let cam;

// Declare and initialize the cell size of the pixelation
let cellSz = 40;

let curX;
let curY;
let nextX, nextY;

let params;
let paramsJson;

function setup() {
  createCanvas(640, 480);
  
  // Start the video feed
  // Creates a p5.MediaElement object
  cam = createCapture(VIDEO);
  
  // Hide the DOM element on the page
  cam.hide();

  params = get_url_params();
  console.log(params)
  paramsJson = urlParamsToJson(params) 
  console.log(paramsJson)
  if (paramsJson) {
    curX = paramsJson.x;
    curY = paramsJson.y;

  }  else {
    curX = 0;
    curY = 0;   
  }
}

function urlParamsToJson(url) {
  const queryString = url.split('?')[1];
  const jsonObj = queryString.split('&').reduce((acc, param) => {
      const [key, value] = param.split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
  }, {});
  return jsonObj;
}

function get_url_params() {
  let query = window.location.search;
  // console.log('query |' + query + '|');
  console.log('query.length', query.length);
  // console.log()
  if (query.length < 1) return null;
  // let params = params_query(query);
  return query;
  // let store = params['store'];
  // console.log('nstore', store);
  // return store;
}


function draw() {
  background(220);
  setTimeout(() => {
    console.log("DO NOTHING")
  },2000);
  // console.log(cam)

  // if (cam.loadPixels()) {
    
    // Load the pixels from the current frame of the video feed
    cam.loadPixels();
    if (cam.pixels[0] != 0) {
      
      // Loop through the image in 2-dimensions
      for(let x = curX; x < curX+cellSz; x+=cellSz) {
        for(let y = curY; y < curY+cellSz; y+=cellSz) {

          // This is too slow
          //let c = cam.get(x,y);

          // Calculate the index number of the r-value of the pixel at x,y
    
          let i = (y*width + x)*4;
          let r = cam.pixels[i];
          let g = cam.pixels[i+1];
          let b = cam.pixels[i+2];

          // Fill with the rgb values of the pixel at x,y
      
          paramsJson.r = `${r}`;
          paramsJson.g = `${g}`;
          paramsJson.b = `${b}`;
          fill(int(paramsJson.r),int(paramsJson.r),int(paramsJson.r));

          // Draw a big rect to represent this pixel 
          rect(x, y, cellSz, cellSz);
          paramsJson.y =int(paramsJson.y) + cellSz;
        }
        paramsJson.x =int(paramsJson.x) + cellSz;
        

      }
      // noLoop();
      newPage();
      noLoop();
      
    }

}
