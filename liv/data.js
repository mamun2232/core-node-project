// dependanci
const fs = require("fs");
const path = require("path");

// scapholdaing
const lib = {};

// base dericator of the data folder
// explore: kuno fulder theke kun folder e data patabo ta bola
lib.basedir = path.join(__dirname, "/../.data/");

// write data to file
lib.create = (dir, file, data, callback) => {
  // open file for writing
  fs.open(
    lib.basedir + dir + "/" + file + ".json","wx",(err, fileDescription) => {
      if (!err && fileDescription) {
        // ekhane file successFully Write korte pereche
        // convert data to string
        const stringData = JSON.stringify(data);
        // write data to file and then closing
        fs.writeFile(fileDescription, stringData, (err2) => {
          if (!err2) {
            fs.close(fileDescription, (err3) => {
              if (!err3) {
                callback(false);
              } else {
                callback("error closing the new file");
              }
            });
          } else {
            callback("Error Writing to new file");
          }
        });
      } else {
        callback("could not create a new file, it maybe Allready exsites", err);
      }
    }
  );
};

// read data from file 
lib.read = (dir , file , callback) =>{
      // read data 
      fs.readFile(lib.basedir + dir + "/" + file + ".json",
      "utf8", (err ,data) =>{
            callback(data)
      })
}


// update exists file
lib.update = (dir , file , data , callback) =>{
      // file open for writing 
      fs.open( lib.basedir + dir + "/" + file + ".json",
      "r+",
      (err, fileDescription) =>{
            if(!err && fileDescription){
                  // convert to data sting 
                  const dataSting = JSON.stringify(data)
                  // truncate the file(file update korte use hoy)
                  fs.truncate(fileDescription , (error) =>{
                        if(!error){
                              // write the file and close it 
                              fs.writeFile(fileDescription , dataSting , (error) =>{
                                    if(!error){
                                          fs.close(fileDescription , (error)=>{
                                                if(!error){
                                                      callback(false)

                                                }
                                                else{
                                                      callback('error closing file')

                                                }
                                          })

                                    }
                                    else{
                                          callback('error writing to file')
                                    }
                              })

                        }
                        else{

                        }
                  })

            }
            else{
                  callback('error updating , file not exsits')
            }
      })

}

// dalate exists file 
lib.delete = (dir , file , callback) =>{
      // unlink delete file 
      fs.unlink(lib.basedir + dir + "/" + file + ".json", (error) =>{
            if(!error){
                  callback(false)
            }
            else{
                  callback('file delete fail')
            }
      })
}

module.exports = lib;
