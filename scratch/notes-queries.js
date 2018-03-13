const knex = require('../knex');

knex.select(1).then(res => console.log(res));

// knex
//   .select('id','title', 'content')
//   .from('notes')
//   .where('title', 'like', '%cats%')
//   .then(results => console.log(JSON.stringify(results, null, 2)));
// knex 
//   .select('id', 'title', 'content')
//   .from('notes')
//   .where('id', '1007')
//   .then(results => console.log(JSON.stringify(results, null, 2)));

// knex
//   .select('id')
//   .from('notes')
//   .where('id', '1007')
//   .update({'title': '7 ways bianca is simliar to cats'})
//   .then(results => console.log(JSON.stringify(results, null, 2)));

// knex('notes')
//   .insert({title: 'hello world', content: 'hi all'})
//   .returning(['id', 'content', 'title'])
//   .then(results => console.log(results));
// knex('notes')
//     .where('id', 1011)
//     .delete()
//     .then(results => console.log(results));