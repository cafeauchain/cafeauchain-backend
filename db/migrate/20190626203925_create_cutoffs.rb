class CreateCutoffs < ActiveRecord::Migration[5.2]
  def change
    create_table :cutoffs do |t|
      t.references :roaster_profile, foreign_key: true
      t.time :day_0, precision: 0
      t.time :day_1, precision: 0
      t.time :day_2, precision: 0
      t.time :day_3, precision: 0
      t.time :day_4, precision: 0
      t.time :day_5, precision: 0
      t.time :day_6, precision: 0
    end
  end
end
