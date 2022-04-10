if ({评级}=="2",dateAdd({错误日期},1,"d"),
	if ({评级}=="3",dateAdd({错误日期},3,"d"),
		if ({评级}=="4",dateAdd({错误日期},8,"d"),
			if ({评级}=="5",dateAdd({错误日期},19,"d"),
				if ({评级}=="6",dateAdd({错误日期},44,"d"),
					if ({评级}=="7",dateAdd({错误日期},100,"d"),
						if ({评级}=="8",dateAdd({错误日期},226,"d"),
							if ({评级}=="9",dateAdd({错误日期},510,"d"),
								if ({评级}=="10",dateAdd({错误日期},1149,"d"),{错误日期})
								)
							)
						)
					)
				)
			)
		)
	)

dateDiff(today(),{复习日期},"days") => 2
nowDiff({复习日期},"days") => 2
dateAdd(today(),1,"days") => 2022-4-10

if(condition, value_if_true, value_if_false)
if({健康码} == "红色", "隔离", "通行")