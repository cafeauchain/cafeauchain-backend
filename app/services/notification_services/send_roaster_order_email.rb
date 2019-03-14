require 'sendgrid-ruby'
module NotificationServices
  class SendRoasterOrderEmail
    include SendGrid
    
    def self.send(recipient, customer, order)
    
      order_items = order.order_items.map {
        |item| {
          text: "#{item.product_variant.product.title} - #{item.product_variant.custom_options["size"].to_i > 16 ? (item.product_variant.custom_options["size"].to_i / 16).to_s + ' lbs' : item.product_variant.custom_options["size"] + ' oz'} #{item.product_options.first.humanize}", 
          image: item.product_variant.product.product_image_urls.first, 
          price: "$#{'%.2f' % (item.line_item_cost.to_f/100)}", 
          quantity: item.quantity
        }
      }
      puts order_items
      mail = Mail.new
      mail.from = Email.new(email: 'info@cafeauchain.com', name: "Cafe au Chain")
      mail.subject = "You've received a new order from #{customer.company_name}"
      mail.template_id = 'd-5aef885aa5504c9c9cec748938ad3d0d'
      personalization = Personalization.new
      personalization.add_to Email.new(email: recipient.email, name: recipient.roaster_profile.name)
      
      personalization.add_dynamic_template_data({
        total: "$#{'%.2f' % order.order_total}",
        items: order_items,
        receipt: true,
        name: customer.company_name,
        address01: customer.primary_address.street_1,
        address02: customer.primary_address.street_2,
        city: customer.primary_address.city,
        state: customer.primary_address.state,
        zip: customer.primary_address.postal_code,
        sender: {
          name: "Cafe au Chain",
          street_1: "345 W Hancock Ave",
          street_2: "Suite 108",
          city: "Athens",
          state: "GA",
          postal_code: "30601"
        }

      })
      mail.add_personalization(personalization)
      sg = SendGrid::API.new(api_key: Rails.application.credentials.sendgrid_api_key)
      response = sg.client.mail._('send').post(request_body: mail.to_json)
      
    end
  end  
end