class CustomMailer < Devise::Mailer   
  default template_path: 'devise/mailer' 

  def reset_password_instructions(record, token, options={})
   if !record.customer_profile_id.blank?
     options[:template_name] = 'customer_reset_password_instructions'
     @subdomain = record.roaster_profile.subdomain
     @roaster = record.roaster_profile
   else
     options[:template_name] = 'reset_password_instructions'
   end
   super
  end
end