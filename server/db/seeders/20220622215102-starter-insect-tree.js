'use strict';

const { Insect, Tree, InsectTree } = require('../models')

    const insectTrees = [
      {
        insect: { name: "Western Pygmy Blue Butterfly" },
        trees: [
          { tree: "General Sherman" },
          { tree: "General Grant" },
          { tree: "Lincoln" },
          { tree: "Stagg" },
        ],
      },
      {
        insect: { name: "Patu Digua Spider" },
        trees: [
          { tree: "Stagg" },
        ],
      },
    ]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let searchInsectId;
    let searchTreeId;


    for (let insectIdx = 0; insectIdx < insectTrees.length; insectIdx++) {
      const {insect, trees} = insectTrees[insectIdx];
      const insectName = insect.name
      const searchInsect = await Insect.findOne( { where: {name: insectName} } )
      searchInsectId = searchInsect.id

      for (let treeIdx = 0; treeIdx < trees.length; treeIdx++) {
        const treeName = trees[treeIdx].tree
        const searchTree = await Tree.findOne( { where: {tree: treeName} } )
        searchTreeId = searchTree.id
        await InsectTree.create({ insectId: searchInsectId, treeId: searchTreeId })
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('InsectTree', null, {})
  }
};
