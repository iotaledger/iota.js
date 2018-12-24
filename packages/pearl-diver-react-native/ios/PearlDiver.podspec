
Pod::Spec.new do |s|
  s.name         = "PearlDiver"
  s.version      = "1.0.0"
  s.summary      = "PearlDiver"
  s.description  = <<-DESC
                  PearlDiver
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "LICENSE" }
  s.author             = { "author" => "chris.dukakis@iota.org" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/iotaledger/iota.js.git", :tag => "next" }
  s.source_files  = "packages/pearl-diver-react-native/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  
