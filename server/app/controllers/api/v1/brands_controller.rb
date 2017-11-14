class Api::V1::BrandsController < ApplicationController
    def index
        render json:Brand.all.sort
    end

    def show
       render json:Brand.find(params[:id])
    end

    def create
        @brand = Brand.new(brand_params)
        if @brand.save
            render :json => @brand
        else
           render :json => { :errors => @brand.errors.full_messages }, :status => 422
        end
    end

    def update
        @brand = Brand.find(params[:id])
        if @brand.update_attributes(brand_params)
            render json: @brand
        else
           render :json => { :errors => @brand.errors.full_messages }, :status => 422
        end
    end

    def destroy
        render json: Brand.destroy(params[:id])
    end

    private

    def brand_params 
        params.require(:brand).permit(:id, :name)
    end

end
