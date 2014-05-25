#!/usr/bin/env python

import os
from random import randint
from time import sleep

# os.system('phantomjs get_item_num.js')


# os.system('phantomjs get_item_list.js')


os.system('rm -f res.csv')
for l in open('item_ids.txt', 'r'):
    itemid = l.strip();
    cmd = 'phantomjs get_item_info.js ' + itemid
    os.system(cmd)
    print cmd
    secs = randint(1,3)
    sleep(secs)
