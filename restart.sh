RAILS_ENV=production rake assets:precompile && echo "precompiled" && ./kill.sh && echo "killed" ; echo "starting"  && ./start.sh
