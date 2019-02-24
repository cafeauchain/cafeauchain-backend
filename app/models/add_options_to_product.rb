# == Schema Information
#
# Table name: add_options_to_products
#
#  id              :bigint(8)        not null, primary key
#  product_options :jsonb
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class AddOptionsToProduct < ApplicationRecord
end
