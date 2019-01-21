class AddStripeCardIdToCard < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :stripe_card_id, :string
  end
end
