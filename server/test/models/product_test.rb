require 'test_helper'

class ProductTest < ActiveSupport::TestCase
    test "should not save product without name" do       
        product = Product.new
        assert_not product.save
    end

    test "should save product with a name" do       
        product = Product.new
        product.name = "test"
        assert product.save
    end

    test "should save not product with a price above 100" do       
        product = Product.new
        product.name = "test"
        product.price = 100.01
        assert_not product.save
    end

    test "should be able to add a brand to a product" do
        product = Product.new
        product.name = "test"
        brand = Brand.new
        brand.name = "brand"
        brand.save
        product.brand = brand
        product.save
        assert_equal(product.brand_id, brand.id)
    end
end