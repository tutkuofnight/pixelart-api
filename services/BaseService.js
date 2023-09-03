class DatabaseService {
  constructor(model){
    this.model = model
  }
  find(where){
    return this.model.find(where || {})
  }
  findById(id){
    return this.model.findById(id)
  }
  create(data){
    return new this.BaseModel(data).save()
  }
  update(id , data){
    return this.model.findByIdAndUpdate(id , data , {new: true})
  }
  updateOne([key , value] , data){
    return this.model.findOneAndUpdate({[key]: value} , data , {new: true})
  }
  delete(id){
    return this.model.findByIdAndRemove(id)
  }
}

module.exports = DatabaseService