//  const fileUpload = () => {
//     var totalfiles = document.getElementById('postupdateshareFile')!.files.length;

// for (var index = 0; index < totalfiles; index++) {
// var file = document.getElementById('postupdateshareFile')!.files[index];
// var previewContainer = "previewupdate_content";
//   set_media_grid(totalfiles,file,previewContainer,index);
//     postData.append("postupdateshareFile[]", document.getElementById('postupdateshareFile')!.files[index]);
// }







// function set_media_grid(totalfiles,file,container_id,index) {
//     var imageTypes = ['jpg','jpeg','png','pjpeg','gif','webp'];
//                    var videoTypes = ['mp4','3gp','webm','mpeg','mpg','avi'];
//                    var filedata;
//   var output = "<div style='height:100%; width:100%;'>";
//     var extension = file.name.split('.').pop().toLowerCase();
//         var fileType =  file.type;
//    // alert(extension);
//                        var thumb1H, thumb2O;
//                  if(totalfiles == 2){
//                        thumb1H = 240;
//                        thumb2O = 340;
//                        }
//                      else if(totalfiles == 3){
//                        thumb1H = 270;
//                        thumb2O = 135;
//                      }else if(totalfiles == 4){
//                        thumb1H = 270;
//                        thumb2O = 90;
//                      }else if(totalfiles == 5){
//                        thumb1H = 360;
//                        thumb2O = 90;
//                      }
 
//                  var srcdata;
 
//            if(totalfiles == 1){
//   output += ' <div class="post-thumb-gallery" id="preview'+index+'"style="width:100%; height:320px; "></div>';
//  }
//  else if(totalfiles == 2){
//  output += '<div class="post-thumb-gallery img-gallery"><div class="row no-gutters"><div class="col-6" id="preview0"></div><div class="col-6" id="preview1" ></div></div></div>';
//  }else if(totalfiles == 3){
 
//  output += '<div class="post-thumb-gallery img-gallery"><div class="row no-gutters"><div class="col-8" id="preview0" style="width:100%; height:252px; "></div><div class="col-4"><div class="row">';
 
//           for(var i =1; i < totalfiles ;i++){
 
//             output += '<div class="col-12" id="preview'+i+'" style="width:100%; height:126px; "></div>';
 
//                    }
//                         output += '</div> </div></div></div>';
//            }else if(totalfiles == 4){
 
//  output += '<div class="post-thumb-gallery img-gallery"><div class="row no-gutters">';
 
//           for(var i =0; i < totalfiles ;i++){
 
//             output += '<div class="col-6" id="preview'+i+'" style="width:100%; height:189px; "></div>';
 
//                   }
 
//                         output += '</div></div>';
//            }else if(totalfiles == 5){
 
//  output +=  '<div class="post-thumb-gallery img-gallery"><div class="row no-gutters"><div class="col-8" id="preview0"></div><div class="col-4"><div class="row">';
 
//           for(var i =1; i < 3 ;i++){
//             output += '<div class="col-12" id="preview'+i+'"></div>';
 
//                     }
//                         output += '</div> </div></div></div><div class="post-thumb-gallery img-gallery"><div class="row no-gutters"><div class="col-6" id="preview3"></div><div class="col-6" id="preview4" ></div></div></div>';
//            }else if(totalfiles == 6){
 
//  output += '<div class="post-thumb-gallery img-gallery"><div class="row no-gutters"><div class="col-8"><div class="row"><div class="col-12" id="preview0"></div><div class="col-12" id="preview1"></div></div></div><div class="col-4"><div class="row">';
 
//           for(var i =2; i < totalfiles ;i++){
//             output += '<div class="col-12" id="preview'+i+'"></div>';
 
//                     }
//                         output += '</div> </div></div></div>';
//         }
//         output +="</div>";
//     $('#'+container_id).html(output);
 
//           var reader = new FileReader();
//            reader.readAsArrayBuffer(file);
//            reader.onload = (function(index,e){
//              var output ;
//  let filedata = e.target.result;
//  let mediafile = new Blob([new Uint8Array(filedata)],{type: file.type});
//  let fileurl = (window.URL || window.webkitURL).createObjectURL(mediafile);
//  // $('#previewhref'+index).attr('src', fileurl);
//  // $(.attr('src', fileurl);
//            if (imageTypes.includes(extension)){
//  if(totalfiles == 1){
//  srcdata = '<figure class="post-thumb img-popup"><a href="'+fileurl+'"  ><img   class="img-responsive" src="'+fileurl+'" alt=""></a></figure>';
//     }else{
//      srcdata = '<figure class="post-thumb"><a href="'+fileurl+'" class="gallery-selector"  ><img   class="img-responsive" src="'+fileurl+'" alt="" style="width:100%; height:100%; "></a></figure>';
 
//     } }else if (videoTypes.includes(extension)) {
//        srcdata = '<div class="embed-responsive embed-responsive-16by9"><video class="embed-responsive-item" controls="controls" src="'+fileurl+'"  style="width:100%; height:100%; "></video></div>';
//    }
//    thumb2O = 170;
//  $('#preview'+index).prepend(srcdata);
//    $(".img-popup").lightGallery();
//          $(".img-gallery").lightGallery({
//              selector: ".gallery-selector",
//              hash: false
//          });
//  }).bind(reader,index);
//  }
 export {}