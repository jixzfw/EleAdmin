//validator
//you can custom validate function for specified field:
{
  asyncField:{
    validator(rule,value,callback){
      ajax({
        url:'xx',
        value:value
      }).then(function(data){
        callback(null);
      },function(error){
        callback(new Error(error))
      });
    }
  }
}