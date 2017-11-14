class Api::V1::ProductsController < ApplicationController
    def index
        render json: Product.all.sort
    end

    def show
       render json: Product.find(params[:id])
    end

    def create
        @product = Product.new(product_params)
        if @product.save
            render :json => @product
        else
           render :json => { :errors => @product.errors.full_messages }, :status => 422
        end
    end

    def update
        @product = Product.find(params[:id])
        if @product.update_attributes(product_params)
            render :json => @product
        else
           render :json => { :errors => @product.errors.full_messages }, :status => 422
        end
    end

    def destroy
        render json: Product.destroy(params[:id])
    end

    private

    def product_params 
        params.require(:product).permit(:id, :name, :description, :price, :brand_id)
    end

end
