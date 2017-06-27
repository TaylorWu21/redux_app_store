class CreateApps < ActiveRecord::Migration[5.1]
  def change
    create_table :apps do |t|
      t.string :name
      t.text :description
      t.string :category
      t.float :price
      t.string :version
      t.string :author
      t.string :logo
      t.boolean :featured

      t.timestamps
    end
  end
end
