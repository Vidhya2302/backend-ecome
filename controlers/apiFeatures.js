class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword
            ? {
                title: {
                    $regex: this.queryString.keyword,
                    $options: 'i' // Case-insensitive search
                }
            }
            : {};

        this.query = this.query.find({ ...keyword }); // ✅ Correctly update `this.query`
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryString }; 
    
        const removeFields = ['keyword'];
    
        removeFields.forEach(field => delete queryCopy[field]);

        for (let key in queryCopy) {
            queryCopy[key] = { $regex: queryCopy[key], $options: 'i' };
        }
    
        this.query = this.query.find(queryCopy); // Assign the filtered query
   
         return this;
    }
} 

export default APIFeatures;

