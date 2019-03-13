require 'sendgrid-ruby'
module NotificationServices
  class SendRoasterOrderEmail
    include SendGrid
    
    def self.send(recipient, customer, order)
    
      order_items = order.order_items.map{|item| {text: item.product_variant.product.title, image: item.product_variant.product.product_image_urls.first, price: "$#{item.line_item_cost.to_f/100}", quantity: item.quantity} }
      mail = Mail.new
      mail.from = Email.new(email: 'info@cafeauchain.com', name: "Cafe au Chain")
      mail.subject = "You've received a new order from #{customer.company_name}"
      mail.template_id = 'd-5aef885aa5504c9c9cec748938ad3d0d'
      personalization = Personalization.new
      personalization.add_to Email.new(email: recipient.email, name: recipient.roaster_profile.name)
      
      personalization.add_dynamic_template_data({
        total: order.order_total,
        items: order_items,
        receipt: true
      })
      mail.add_personalization(personalization)
      sg = SendGrid::API.new(api_key: Rails.application.credentials.sendgrid_api_key)
      response = sg.client.mail._('send').post(request_body: mail.to_json)
      
    end
  end  
end