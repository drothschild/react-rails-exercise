class Product < ApplicationRecord
    validates :name, presence: true
    validates :price, numericality: {less_than_or_equal_to: 100 }
    belongs_to :brand, optional: true
end