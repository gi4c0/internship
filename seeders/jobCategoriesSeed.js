'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
*/
    let arr = [
      'Accounting',
      'General Business',
      'Other',
      'Admin & Clerical',
      'General Labor',
      'Pharmaceutical',

      'Automotive',
      'Government',
      'Professional Services',

      'Banking',
      'Grocery',
      'Purchasing',
      'Procurement',

      'Biotech',
      'Health Care',
      'QA',
      'Quality Control',

      'Broadcast',
      'Journalism',
      'Hotel',
      'Hospitality',
      'Real Estate',

      'Business Development',
      'Human Resources',
      'Research',

      'Construction',
      'Information Technology',
      'Restaurant',
      'Food Service',

      'Consultant',
      'Installation',
      'Maint',
      'Repair',
      'Retail',
      'Customer Service',
      'Insurance',
      'Sales',
      'Design',
      'Inventory',
      'Science',

      'Distribution',
      'Shipping',
      'Legal',
      'Skilled',
      'Labor',
      'Trades',
      'Education',
      'Teaching',
      'Legal Admin',
      'Strategy',
      'Planning',
      'Engineering',
      'Management',
      'Supply Chain',
      'Entry Level',
      'New Grad',
      'Manufacturing',
      'Telecommunications',
      'Executive',
      'Marketing',
      'Training',
      'Facilities',
      'Media',
      'Newspaper',
      'Transportation',
      'Finance',
      'Nonprofit',
      'Social Services',
      'Warehouse',
      'Franchise',
      'Nurse'
    ]
    let obj = []
    arr.map((val) => {
      return obj.push({ jobCategory: val })
    })
    return queryInterface.bulkInsert('JobCategories', obj
      , {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
