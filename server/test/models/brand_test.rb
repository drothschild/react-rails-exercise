require 'test_helper'

class BrandTest < ActiveSupport::TestCase
    test "should not save Brand without name" do       
        brand = Brand.new
        assert_not brand.save
    end

    test "should save brand with name" do
        brand = Brand.new
        brand.name = "test"
        assert brand.save
    end
end
