class CreateVariantOptions < ActiveRecord::Migration[5.2]
  def change
    create_table :variant_options do |t|
      t.references :roaster_profile, foreign_key: true
      t.string :title
      t.string :options, array: true

      t.timestamps
    end
  end
end
