<?php

use Flarum\Database\Migration;
use Flarum\Group\Group;

return Migration::addPermissions([
    'johnniefukcer.embedvideo.create' => Group::MEMBER_ID
]);
