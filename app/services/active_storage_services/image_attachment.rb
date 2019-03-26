module ActiveStorageServices
  class ImageAttachment

    def initialize(file, attachable_id, attachable_class, attr)
      @file = file
      @attachable = attachable_class.constantize.find(attachable_id)
      @attr = attr.to_sym
    end

    def call
      uploaded_io = @file
      metadata = uploaded_io.split(',')[0] + ","
      filetype = metadata.split("/")[1].split("base64")[0][0...-1]
      base64_string = uploaded_io[metadata.size..-1]
      blob = Base64.decode64(base64_string)
      image = MiniMagick::Image.read(blob)

      @attachable.send(@attr).attach(io: File.open(image.path), filename: (@attr.to_s + "." + filetype))
    end

    def callAsFile(size = 'small')
      if size == 'thumb'
        dim = '150x150>'
      elsif size == 'small'
        dim = '300x300>'
      elsif size == 'medium'
        dim = '600x600>'
      elsif size === 'large'
        dim = '900x900>'
      end
      image = MiniMagick::Image.read(@file.tempfile)
      image.combine_options do |img|
        img.resize dim
      end
      image.format 'jpg'

      @attachable.send(@attr).attach(io: File.open(image.path), filename: @attr.to_s + ".jpg")
    end
  end
end
